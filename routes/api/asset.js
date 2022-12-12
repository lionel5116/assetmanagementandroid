const express = require('express');
const router = express.Router();
const Asset = require('../../models/Asset');
const config = require('config')
const {check, validationResult} = require('express-validator')

router.post('/createAsset',
       [check("Name").not().isEmpty()
       ],
       async(req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({message: 'Failed to add a asset, missing required field information.'});
        }

        const {
            Name,
            Type,
            Location,
            Balance,
            ABANumber,
            Notes
          }  = req.body;



       let existAsset;
       try {
            existAsset = await Asset.findOne({Name : Name});

       } catch (error) {
           return res.status(500).json({message: 'Issue verifying if asset exists'});
       }

       if(existAsset){
           return res.status(500).json({message: 'Asset Record exists already..'});
       }

       const createAsset = new Asset({
        Name,
        Type,
        Location,
        Balance,
        ABANumber,
        Notes
      });

      await createAsset.save().then(() => {
        res.status(201).json({Asset: createAsset.toObject({getters: true})});
        })
        .catch((error) => {
            return res.status(500).json({message: 'Failed add up Asset record. please try again: -' + error});
        });

    res.status(201);

   });


module.exports = router;


