const {
  AuthenticationError, UserInputError 
} = require('apollo-server-express');
const {
  Profile,
  Conversation
} = require('../models');
const {
  signToken
} = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')


const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, {
      profileId
    }) => {
      return Profile.findOne({
        _id: profileId
      });
    },
    //* By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({
          _id: context.user._id
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    findProfileByInterest: async (parent, {
      profileInterest
    }) => {
      return Profile.find({
        interests: profileInterest
      });
    },
    checkout: async (parent, args, context) => {
      // const url = new URL("https://google.com");
      console.log(context.headers.referer);
      const url = new URL(context.headers.referer).origin;
      const line_items = [];
      const products = [...args.products];

      console.log(products);
      // have an array of products
      // array has name, description, id, and price

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return {
        session: session.id
      };
    },

    friendRequests: async (_, args, ) => {
      try {
        const userDet = await Profile.findById(args.id);
        return userDet.map((f) => ({
          id: f.id,
          firstname: f.firstname,
          createdAt: f.createdAt,
        }));
      } catch (error) {
        console.log(error);
        throw new Error("Error getting users");
      }
    },

    friends: async (_, args,) => {
      try {
        const userDet = await Profile.findById(args.id);
        return userDet.Profile.map((f) => ({
          id: f.id,
          firstname: f.firstname,
          createdAt: f.createdAt,
        }));
      } catch (error) {
        console.log(error);
        throw new Error("Error getting users");
      }
    },

    getConversations: async (_, { id },) => {
      try {
          const conversation = await Conversation.find({
              $in: id,
          });
          return conversation;
      }
      catch (error) {
          console.log(error);
          throw new Error("Error getting conversations");
      }
  },
  },
  Mutation: {
    login: async (parent, {
      email,
      password
    }) => {
      const profile = await Profile.findOne({
        email
      });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return {
        token,
        profile
      };
    },
    createProfile: async (parent, args) => {
      const profile = await Profile.create(args);
      const token = signToken(profile);
      return {
        token,
        profile
      };
    },
    deleteProfile: async (parent, {
      profileId
    }, context) => {
      return Profile.findOneAndDelete({
        _id: profileId
      });
    },
    addInterest: async (parent, {
      profileId,
      interest
    }, context) => {
      return Profile.findOneAndUpdate({
        _id: profileId
      }, {
        $addToSet: {
          interests: interest
        }
      }, {
        new: true,
        runValidators: true
      });
    },
    deleteInterest: async (parent, {
      profileId,
      interest
    }, context) => {
      return Profile.findOneAndUpdate({
        _id: profileId
      }, {
        $pull: {
          interests: interest
        }
      }, {
        new: true
      });
    },
    updateUserBio: async (parent, {
      profileId,
      userBio
    }, context) => {
      // works on backend
      // if (context.profile) {
      // return await Profile.findByIdAndUpdate(context.profile._id, args, { new: true})
      return await Profile.findByIdAndUpdate({
        _id: profileId
      }, {
        userBio: userBio
      }, {
        new: true
      })
      // }
      // throw new AuthenticationError("Please login first!");
    },

    friendRequest: async (_, { id }) => {
      try {
          if (!user) {
              throw new AuthenticationError("You must login to send a friend request");
          }
          const userTo = await Profile.findById(id);
          const userFrom = await Profile.findById(Profile.id);
          if (userTo.friendRequests.find((f) => f.id === userFrom.id)) {
              userTo.friendRequests = userTo.friendRequests.filter((f) => f.id !== userFrom.id);
          }
          else {
              userTo.friendRequests.push({
                  userId: userFrom.id,
                  name: userFrom.name,
                  createdAt: new Date().toISOString(),
              });
              await userTo.save();
              return userTo;
          }
      }
      catch (error) {
          throw new Error("Error sending friend request");
      }},
      acceptFriendRequest: async (_,) => {
        try {
            if (!Profile) {
                throw new AuthenticationError("You must login to accept a friend request");
            }
            const requestSender = await Profile.findOne(Profile.id);
            const requestReceiver = await Profile.findById(Profile.id);
            if (!requestReceiver.friends.find((f) => f.userId === userId) &&
                !requestSender.friends.find((f) => f.userId === requestReceiver.userId)) {
                requestReceiver.friends.push({
                    userId: requestSender.id,
                    name: requestSender.name,
                    createdAt: new Date().toISOString(),
                });
                requestSender.friends.push({
                    userId: requestReceiver.id,
                    name: requestReceiver.name,
                    createdAt: new Date().toISOString(),
                });
                await Profile.updateOne({ _id: requestReceiver.id }, { $pull: { friendRequests: { _id: id } } });
                await requestReceiver.save();
                await requestSender.save();
                return requestReceiver;
            }
            else {
                throw new UserInputError("Already Friends");
            }
        }
        catch (error) {
            throw new Error("Error accepting friend request");
        }
    },
    declineFriendRequest: async (_,) => {
      try {
          if (!Profile) {
              throw new AuthenticationError("You must login to accept a friend request");
          }
          const me = await Profile.findById(Profile.id);
          await Profile.updateOne({ _id: me.id }, { $pull: { friendRequests: { _id: id } } });
          await me.save();
      }
      catch (err) {
          throw new Error("Error declining friend request");
      }
  },
      unFriend: async (_,) => {
      try {
          if (!Profile) {
              throw new AuthenticationError("You must login to accept a friend request");
          }
          const friend = await Profile.findOne({ id });
          const currentUser = await Profile.findById(Profile.id);
          if (currentUser.friends.find((f) => f.id === friend.id)) {
              await models.User.updateOne({ _id: currentUser.id }, { $pull: { friends: { id : friend.id  } } });
              await models.User.updateOne({ _id: friend.id }, { $pull: { friends: { id  : currentUser.id } } });
              await friend.save();
              await currentUser.save();
              return friend;
          }
          else {
              throw new UserInputError("Not in my friends List");
          }
      }
      catch (error) {
          throw new Error("Error in unfriending");
      }}, 
    createConversation: async (_, ) => {
    const conv = new Conversation({
        members: [{ sender, receiver }],
    });
    try {
        const saveConv = await conv.save();
        return saveConv;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error in creating conversation");
    }},
  }
}

module.exports = resolvers;