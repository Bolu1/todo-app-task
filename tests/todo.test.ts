import request from 'supertest'
const app =  require('../src/app')

jest.useRealTimers();

describe("POST /todo-item/create", ()=>{

    describe("when name is given", ()=>{
       test("should return 201", async()=>{
           const response = await await request(app).post("/api/todo-item/create").send({
                title: "shopping"
           })
           expect(response.statusCode).toBe(201)
       }, 100000)
       
    })

    describe("when text is not given", ()=>{
         
        test("should return 400", async()=>{
            const response = await await request(app).post("/api/todo-item/create")
            expect(response.statusCode).toBe(400)
        }, 100000)
    })
})

describe("POST /todo-item/list", ()=>{

    describe("Get directories", ()=>{
       test("should return 200", async()=>{
           const response = await await request(app).post("/api/todo-item/list")
           expect(response.statusCode).toBe(200)
       }, 100000)
       
    })
})


describe("POST /todo-item/mark-as-done", ()=>{

    describe("mark as done with item id", ()=>{
        test("should return 200", async()=>{
            const response = await await request(app).post("/api/todo-item/mark-as-done").send({
                id:1233929322
            })
            expect(response.statusCode).toBe(200)
        }, 100000)
        
     })

    describe("mark as done without item id", ()=>{
       test("should return 400", async()=>{
           const response = await await request(app).post("/api/todo-item/mark-as-done")
           expect(response.statusCode).toBe(400)
       }, 100000)
       
    })
})

describe("POST /todo-item/mark-as-not-done", ()=>{

    describe("mark as done with item id", ()=>{
        test("should return 200", async()=>{
            const response = await await request(app).post("/api/todo-item/mark-as-not-done").send({
                id:1233929322
            })
            expect(response.statusCode).toBe(200)
        }, 100000)
         
     })

    describe("mark as done without item id", ()=>{
       test("should return 400", async()=>{
           const response = await await request(app).post("/api/todo-item/mark-as-not-done")
           expect(response.statusCode).toBe(400)
       }, 100000)
       
    })
})

describe("POST /todo-item/move-to-directory", ()=>{

    describe("move an item with item id and directory id", ()=>{
        test("should return 200", async()=>{
            const response = await await request(app).post("/api/todo-item/move-to-directory").send({
                id:1233929322,
                directoryId: 12122233
            })
            expect(response.statusCode).toBe(200)
        }, 100000)
        
     }) 

    describe("move an item with no item id and directory id", ()=>{
       test("should return 400", async()=>{
           const response = await await request(app).post("/api/todo-item/move-to-directory")
           expect(response.statusCode).toBe(400)
       }, 100000)
       
    })
})