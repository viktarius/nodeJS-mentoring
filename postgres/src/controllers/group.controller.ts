import express from "express";
import { groupService } from "../core/services";
import { groupMapper } from "../core/mappers";
import { HttpException } from "../core/exeption";

const router = express.Router();

router.get("/", async (req, res) => {
    const groups = await groupService.getAllGroups();
    res.json(groups.map(groupMapper.toDomain))
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const group = await groupService.getGroupById(id);
        if (group) {
            res.json(groupMapper.toDomain(group[0]))
        }
        next(new HttpException(404, 'group not found'))
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

router.post('/', async (req, res, next) => {
    try {
        const createdGroup = await groupService.addGroup(req.body);
        res.status(201).json(groupMapper.toDomain(createdGroup[0]))
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedGroup = await groupService.updateGroup(id, groupMapper.toBase(req.body));
        res.json(groupMapper.toDomain(updatedGroup));
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await groupService.deleteGroup(id);
        res.send('ok');
    } catch (e) {
        next(new HttpException(500, e.message));
    }
});

export { router as groupRouter };
