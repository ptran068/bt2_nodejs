const express = require('express');
const app = express();
const port = 3000;
const bodyParse = require('body-parser');
const fs = require('fs');
app.use(bodyParse.urlencoded({extended : false}));
app.get('/', (req, res) => res.send('Hello World!'))

const users = [
	{
		id: 1,
		name: 'phong',
		password: 'abc123',
		gender: 'male'
	},
	{
		id: 2,
		name: 'nhan',
		password: 'abc123',
		gender: 'male'
    },
    {
		id: 3,
		name: 'tuan',
		password: 'abc123',
		gender: 'male'
    },
    {
		id: 4,
		name: 'user1@gamil.com',
		password: 'abc123',
		gender: 'male'
	},
    
];

function writeFile(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) {
                return reject(err.message);
            } else {
                // const convertArr = JSON.stringify(users);
                return resolve();
            }
        })
    })
}

app.get('/write-file', async (req, res) => {
    try {
        const convertArr = JSON.stringify(users);
        const writeUser = await writeFile('data',convertArr);
        
        return res.status(200).json({message : 'Success'});
    } catch (e) {
        return res.status(400).json({message : 'Cant write file'});
    }
})

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path ,(err,data) => {
            if (err) {
                return reject(err);
            } else {
                const fileContent = JSON.parse(data);
                return resolve(fileContent);
            }
        })
    })
}

app.get('/read-file', async (req, res) => {
    try {
        const data = await readFile('data');
        
        return res.status(200).json({message : 'Success', data : data});
    } catch (e) {
        return res.status(400).json({message : 'Error'});
    }
});

app.put('/user/edit/:userId', async (req,res) => {
    try {
        const userId = parseInt(req.params.userId);
        const body = req.body;
        const users = await readFile('data');
        for (const iteam of users) {
                let index = 0;
                if (iteam.id === userId) {
                users.splice(index, 1);
			    await writeFile('data', users);
                const info = {
                    id : parseInt(body.id),
                    name: body.name,
                    pass: body.pass,
                    gender: body.gender
                }
                users.push(info);
                const convertArr = JSON.stringify(users);
                await writeFile('data',convertArr);
                return res.status(200).json({message:'Done'});
           }
               index++;
        }
         
        return res.status(400).json({message:'fail'});
       
    } catch (e) {
        return res.status(400).json({message:'fail', e: e.message});
    }
});

//search

app.get('/users/search/regex/:name', async (req ,res) => {
      try {
                const name = req.params.name;
                let nameParaLength = name.length;
                let lowCaseNamePara =name.toLowerCase();
                const source = await readFile('data');
                console.log(source);
                let filteredSource = source.filter(each => {
                    let eachLength = each.name.length;
                    let lowCaseEach = each.name.toLowerCase();
                    if (eachLength<nameParaLength){
                        let isInclueded = lowCaseNamePara.includes(lowCaseEach);
                            if (isInclueded) {
                                return true;
                                }
                    }
                    if (eachLength>nameParaLength){
                        let isInclueded= lowCaseEach.includes(lowCaseNamePara);
                        if (isInclueded) {
                            return true
                            }
                    }
                    return false
                });
                return res.json({message: 'done', data: filteredSource});
      } catch (e) {
            return res.status(400).json({message:'fail', e: e.message});
      }
    
})

//get one user by id 
// app.get('/read-file/:userId', async (req, res) => {
//     try {
// 		const users = await readFile('data');
//         const userId = parseInt(req.params.userId);
//         console.log(userId);
// 		for (const item of users) {
// 			if (item.id == userId) {
// 				return res.status(200).json({ user: item });
// 			}
// 		}
// 		return res.status(400).json({ message: 'User is not found' });
// 	} catch (e) {
// 		return res.status(400).json({ message: 'Cannot read user file', error: e.message });
// 	}
// });
// Update one user api

// Create one user api
// function createUser(id,email,pass,gender) {
//     return new Promise((resolve, reject) => {
//         const infor = {
//             id,
//             email,
//             pass,
//             gender
//         };
//         const end = users.push(infor);
//         return resolve(end);
//     })
// }

// app.get('/create', async  (req, res) => {
//       try {
//         const read = await readFile('data');
//         const users = await createUser(5,'phong','xxxx','male');
//         await writeFile('data',users);
//         console.log(users);
       

//         return res.status(200).json({ user: 'sucess' });
//       } catch (e) {
//         return res.status(400).json({ message: 'Cannot read user file' });
//       }

// });

// Delete one user api
// app.delete('/delete/:userId', async (req, res) => {
//     try {
// 		const users = await readFile('data');
//         const userId = parseInt(req.params.userId);
        
// 		for (const iteam of users) {
//             let index = 0;
//             if (iteam.id === userId) {
//                 users.splice(index,1);
//                 await writeFile('data',users);
//                 return res.status(200).json({ user: 'Success' });
//             }
//             index++;     
//         }
//         return res.status(400).json({ message: 'Cannot read user file' });
        
// 	} catch (e) {
// 		return res.status(400).json({ message: 'Cannot read user file'});
// 	}
// });

// app.post('/check',async (req, res) => {
//     try {
//             const body = req.body;
//             const user = await readFile('data');
//             const info = {
//                 id : parseInt(body.id),
//                 email : body.email,
//                 pass : body.pass,
//                 gender : body.gender
//             }
//             for (const iteam of user) {
//                 if (iteam.id === body.id) {
//                     return res.status(400).json({message: 'êrrrr'});
//                 }
//             }
//              user.push(info);
//              await writeFile('data',user);
//              return res.json({message : 'done'});

//     } catch (e) {
//         return res.status(400).json({message:'aa'});
//     }
    
    
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
