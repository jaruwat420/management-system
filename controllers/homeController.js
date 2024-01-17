import { response } from "express";

export const renderHome = async(req, res) => {
    res.render('regbook', {
        layout: "regbook_layouts",
        title: "ค้นหาเล่มทะเบียนรถ",
    });
}