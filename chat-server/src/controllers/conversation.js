import Conversation from "../models/Conversation";
import { Request, Response, NextFunction } from "express";


export const createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
export const getConversationOfAUser = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        return res.status(200).json(conversation);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
export const getConversationOfTwoUsers = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        return res.status(200).json(conversation);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};