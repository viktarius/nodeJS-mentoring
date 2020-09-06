import express from "express";
import { groupService } from "../services";
import { groupMapper } from "../mappers";

const router = express.Router();

router.get("/", async (req, res) => {
    const groups = await groupService.getAllGroups();
    res.json(groups.map(groupMapper.toDomain))
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const group = await groupService.getGroupById(id);
        res.json(groupMapper.toDomain(group[0]))
    } catch (e) {
        res.status(404).send('group nor found');
    }
});

router.post('/', async (req, res) => {
    try{
        const createdGroup = await groupService.addGroup(req.body);
        res.status(201).json(groupMapper.toDomain(createdGroup[0]))
    }catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const updatedGroup = await groupService.updateGroup(id, groupMapper.toBase(req.body));
        res.json(groupMapper.toDomain(updatedGroup));
    }catch (e) {
        res.status(404).send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await groupService.deleteGroup(id);
        res.send('ok');
    } catch (e) {
        res.status(404).send('group not found')
    }
});

export { router as groupRouter };
