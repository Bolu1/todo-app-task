import request from 'supertest'
const app =  require('../src/app')

jest.useRealTimers();

describe("POST /directory/create", ()=>{

    describe("when name is given", ()=>{
       test("should return 201", async()=>{
           const response = await await request(app).post("/api/directory/create").send({
                name: "shopping"
           })
           expect(response.statusCode).toBe(201)
       }, 100000)
       
    })

    describe("when name is not given", ()=>{
         
        test("should return 400", async()=>{
            const response = await await request(app).post("/api/directory/create")
            expect(response.statusCode).toBe(400)
        }, 100000)
    })
})

describe("POST /directory/list", ()=>{

    describe("Get directories", ()=>{
       test("should return 200", async()=>{
           const response = await await request(app).post("/api/directory/list")
           expect(response.statusCode).toBe(200)
       }, 100000)
       
    })
})


describe("POST /directory/remove", ()=>{

    describe("remove directory when pasing id", ()=>{
        test("should return 200", async()=>{
            const response = await await request(app).post("/api/directory/remove").send({
                id:1233929322
            })
            expect(response.statusCode).toBe(200)
        }, 100000)
        
     })

    describe("remove directory without pasing id", ()=>{
       test("should return 400", async()=>{
           const response = await await request(app).post("/api/directory/remove")
           expect(response.statusCode).toBe(400)
       }, 100000)
       
    })
})