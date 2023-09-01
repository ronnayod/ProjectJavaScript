const express = require('express')
const router = express.Router()
const Subscriber = require('../models/room_Schema')


// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

// Creating one
router.post('/users/create', async(req, res) => {
              const user = req.body;
              const client = new MongoClient(uri);
              await client.connect();
            //   เพิ่มข้อมูล เข้าไปใน test ที่ collection users
              await client.db('room').collection('room').insertOne({
                            id: parseInt(user.id),
                            nameroom: user.nameroom,
                            image: user.image,
                            namemovie: user.namemovie,
                            time: user.time
              });
              await client.close();
              res.status(200).send({
                "status": "ok",
                "message": "User with ID = "+user.id+" is created",
                "user": user
              });
            });

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await room_Schema.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}







module.exports = router
            
            