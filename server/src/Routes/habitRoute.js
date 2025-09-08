const express = require('express')
const Habit = require('../Models/habit')
const authMiddleware = require('../Middleware/userAuthMiddleware')

const router = express.Router()

// add habit
router.post('/habit', authMiddleware, async (req, res) =>{
    const {habitName, goal, type, history, currentStreak, longestStreak, createdAt} = req.body

    try{
        const addHabit = await Habit.create({
            habitName: habitName,
            goal: goal,
            type: type,
            history: history,
            currentStreak: currentStreak,
            longestStreak: longestStreak,
            createdAt: createdAt,
        })
        res.status(201).json(addHabit)
    }catch(error){
        console.log(error)
        res.status(400).json({
            error: error.message
        })
    }
})


// get all habits
router.get('/habit', authMiddleware, async (req, res) =>{
    try {
        const getAllHabits = await Habit.find()
        res.status(200).json(getAllHabits)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
})


// Get Single habit
router.get('/habit/:id', authMiddleware, async (req, res) =>{
    const {id} = req.params

    try {
        const getSingleHabit = await Habit.findById({_id: id})
        if(!getSingleHabit){
            res.status(404).json("habit not found")
        }
        res.status(200).json(getSingleHabit)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
})

// update habit by id
router.put('/habit/:id', authMiddleware, async (req, res) =>{
    const { id } = req.params;
    const {habitName, goal, type, history, currentStreak, longestStreak, createdAt} = req.body
    try {
        const updateHabit = await Habit.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(updateHabit)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
})



// Delete habit by id
router.delete('/habit/:id', authMiddleware, async (req, res) =>{
    const {id} = req.params

    try {
        const habit = await Habit.findByIdAndDelete({_id: id})
        if(!habit){
            res.status(404).json("habit not found")
        }
        res.status(200).json(habit, "this habit has been deleted")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
})


module.exports = router