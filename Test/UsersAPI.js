import supertest from "supertest";
import { expect } from "chai";

const request  = supertest('https://gorest.co.in/public/api/')

/**
 * start a testing for users data...
 */
const TOKEN= '6e6538c7d0a4d020ef666f855810527514ac75f4d31fe6ea1540df3c60f2b8cb'
describe('users' , ()=>{
    it('Get /users',()=>{
        request
        .get(`users?access-token=${TOKEN}`)
        .end((err,res)=>{
            if(err){
                console.log('error during users data retrieval  : ' + err);
            }
            // console.log('data : ' + res.json);
            expect(res.body).to.not.be.null;
        })
    })
})

