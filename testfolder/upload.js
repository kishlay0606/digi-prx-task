const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
let assert = chai.assert;
let expect = chai.expect;



chai.use(chaiHttp)
const fs = require('fs')
describe("PDF upload", () => {
    it('it should upload pdf', async () => {
        let url = "/upload"
        let res = await chai.request("http://localhost:5000")
            .post(url)
            .set('Content-Type', 'multipart/form-data')
            .attach('file',
                fs.readFileSync('../amit.pdf'), 'amit.pdf')
        console.log(res.body)
        res.should.have.property('status')
        res.body.should.have.property('fileName');
        res.body.should.have.property('filePath');
        res.should.have.status(200);
        assert.isOk(res.body);



    })
    it('it should throw error when no file is uploaded', async () => {
        let url = "/upload"
        let res = await chai.request("http://localhost:5000")
            .post(url)
            .set('Content-Type', 'multipart/form-data')
        console.log(res.body)

        res.should.have.property('status')
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('success').to.equal('False');
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('msg').to.equal('No file was selected');
        assert.isOk(res.body);



    })
    it('it should throw error while downloading link', async () => {
        let id = "dxfcgvhbjcvb.pdf";
        let url = "/download/" + id;
        let res = await chai.request("http://localhost:5000")
            .get(url)
        console.log(res.body)
        res.should.have.property('status')
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('success').to.equal('False');
        expect(res.body).to.have.property('msg');
        expect(res.body).to.have.property('msg').to.equal('invalid link');
        assert.isOk(res.body);




    })

    // it('it should download pdf', async () => {
    //     let id="amit.pdf";
    //     let url="/download/"+id;
    //     let res = await chai.request("http://localhost:5000")
    //     .get(url)
    //     // .set('Content-Type', 'multipart/form-data')
    //     console.log(res.body);

    //      res.should.have.property('status')
    //     //  res.body.should.have.property('fileName');
    //     //  res.body.should.have.property('filePath');
    //      res.should.have.status(200);
    //      assert.isOk(res.body);



    // })


})