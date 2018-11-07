const SHA256 = require('crypto-js/sha256');
const BlockClass = require('../models/Block.js');
const db = require("../providers/db.js");
const { check, validationResult } = require('express-validator/check');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;

        this.blocks = [];
         this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
      getBlockByIndex() {

        this.app.get("/block/:index", (req, res) => {
            // Add your code here
            (async () => {
                res.setHeader('Content-Type', 'application/json');

                try{

                    res.send( await db.getBlock(req.params['index']));
                }catch (error){
                    res.status(500).send( `Error when retrieving block: ${error}`);

                }

            })()


        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/block",[
             // body must exist
            check('body').exists({checkNull: true}).withMessage('must exist'),
            check('body').isLength({ min: 1 }).withMessage('must not be empty')
        ], (req, res) => {
             const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            (async () => {
                res.setHeader('Content-Type', 'application/json');

                res.send(await db.addBlock(req.body));
            })()
        });
    }
   
    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */

    

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app); }