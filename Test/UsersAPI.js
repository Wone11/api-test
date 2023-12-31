import supertest from "supertest";
import { expect } from "chai";
  
const request  = supertest('https://gorest.co.in/public/v2/')

/**
 * start a testing for users data...
 */
const TOKEN= '6e6538c7d0a4d020ef666f855810527514ac75f4d31fe6ea1540df3c60f2b8cb'
describe('users' , ()=>{
    it('Get /users',(done)=>{
        request
        .get(`users?access-token=${TOKEN}`)
        .end((err,res)=>{
            if(err){
                console.log('error during users data retrieval  : ' + err);
            }
            // console.log('data : ' + res.json);
            expect(res.body).to.be.not.null;
            done();
        })
    })

    it('GET /users/:id/',()=>{
        request
        .get(`users/:1?access-token=${TOKEN}`,()=>{
            expect(res.body.id).to.be.eq(1);
        })
    })

    it('GET /users/with query params',()=>{
        const status = 'active'
        const gender = 'female'
        request
        .get(`users/?access-token=${TOKEN}&status=${status}&gender=${gender}`,()=>{
            expect(res.body).to.be.not.empty;
            res.body.data.forEach(data => {
                expect(data.gender).to.eq("female")
                expect(data.status).to.eq("active")
            });
        })
    })

    it('POST /users',()=>{
        const data={
            email:`test-${Math.floor(Math.random()* 10000)}@gmail.ca`,
            name:`Fritas-${Math.floor(Math.random() * 100)}`,
            gender:'female',
            status:'active'
        }
        return request.post('/users')
        .set("Authorization",`Bearer ${TOKEN}`)
        .send(data)
        .then((res)=>{
            // console.log('added data : ' +JSON.stringify(res.body));
            //test here by chnging an email adderss
            // data.email = 'done@mail.ca'
            expect(res.body).to.deep.include(data);
            // expect(res.body.email).to.be.eq(data.email);
            // expect(res.body.gender).to.be.eq(data.gender);
            // expect(res.body.status).to.be.eq(data.status);
    

            // done();
        })

    })

    it('PUT /users:id',()=>{
        // console.log('here we are ready to update a data!');
        const id =3355342
        const data ={
            status:"inactive",
            name:"Bura - " + Math.floor(Math.random() * 100),
            gender:"male"
        }

        return request.put(`users/${id}`)
               .set('Authorization', `Bearer ${TOKEN}`)
               .send(data)
               .then((res)=>{
                expect(res.body).to.deep.include(data)
               })

    })
})

