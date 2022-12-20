import { Request, Response, NextFunction } from "express";
import Message from "../models/message";

export const addMessage = async (req, res, next) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        return res.status(200).json(savedMessage);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
export const getAMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        return res.status(200).json(messages);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
