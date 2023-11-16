import { response } from "express";

export const renderHome = async(req, res) => {
    res.render('dashboard' ,{layout: 'main'});
}