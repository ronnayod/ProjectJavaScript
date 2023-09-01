// ส่งข้อมูล : post = ไว้ส่ง
app.post('/customer/create', async(req, res) => {
              const customer = req.body;
              const client = new MongoClient(uri);
              await client.connect();
            //   เพิ่มข้อมูล เข้าไปใน test ที่ collection customers
              await client.db('room').collection('room').insertOne({
                id: parseInt(customer.id),
                nameroom: customer.nameroom,
                image: customer.image,
                namemovie: customer.namemovie,
                time: customer.time
              });
              await client.close();
              res.status(200).send({
                "status": "ok",
                "message": "customer with ID = "+customer.id+" is created",
                "customer": customer
              });
            })
            
            //get all
            app.get('/customers', async(req, res) => {
                const id = parseInt(req.params.id);
                const client = new MongoClient(uri);
                await client.connect();
                const customers = await client.db('room').collection('room').find({}).toArray();
                await client.close();
                res.status(200).send(customers);
              })
            
            
              //get by id
              app.get('/customers/:id', async(req, res) => {
                const id = parseInt(req.params.id);
                const client = new MongoClient(uri);
                await client.connect();
                const customer = await client.db('room').collection('room').findOne({"id": id});
                await client.close();
                res.status(200).send({
                  "status": "ok",
                  "customer": customer
                });
              })
            
              // เอาไว้แก้ไขนะ put 
              app.put('/customers/update', async(req, res) => {
                const customer = req.body;
                const id = parseInt(customer.id);
                const client = new MongoClient(uri);
                await client.connect();
                await client.db('room').collection('room').updateOne({'id': id}, {"$set": {
                  id: parseInt(customer.id),
                  nameroom: customer.nameroom,
                  image: customer.image,
                  namemovie: customer.namemovie,
                  time: customer.time,
                }});
                await client.close();
                res.status(200).send({
                  "status": "ok",
                  "message": "customer with ID = "+id+" is updated",
                  "customer": customer
                });
              })
            
            