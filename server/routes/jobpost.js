const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const adminlogin = require('../middleware/adminMiddleware')
const userlogin = require('../middleware/userMiddleware')
const PostJob = mongoose.model("PostJob")

router.get("/allposts",userlogin,adminlogin,(req,res)=>{
    PostJob.find()
    .populate("postedBy","_id name pics company position")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
        console.log(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/createpost',userlogin,adminlogin,(req,res)=>{
    const {title,description,tskills,lastdate,jminexperience,jmaxexperience,jcompany,photo,vacancy,maxsalary,salary,location} = req.body
    if(!title ||!description ||!tskills ||!lastdate ||!jminexperience ||!jmaxexperience ||!jcompany ||!vacancy ||!salary ||!location ||!maxsalary){
        return res.status(422).json({error:"please fill the fields"})
    }
    req.Admin.password = undefined
    const postjob = new PostJob({
        title,
        description,
        tskills,
        lastdate,
        jminexperience,
        jmaxexperience,
        jcompany,
        vacancy,
        salary,
        maxsalary,
        location,
        photo:photo,
        postedBy:req.Admin

    })
    postjob.save().then(result=>{
        res.json({postjob:result})
    
    }).catch(err =>{
        console.log(err)
    })
})
router.get('/job/:id',userlogin,(req,res)=>{
    PostJob.findOne({_id:req.params.id})
       .populate("postedBy","_id name pics company position")
       .then(posts=>{
       
            // console.log("postshhhh",posts)
                res.json({posts})
        
       }).catch(err=>{
           console.log(err)
       })
 })

 router.get('/admin/job/:id',adminlogin,(req,res)=>{
    PostJob.findOne({_id:req.params.id})
       .populate("postedBy","_id name pics company position")
       .populate("applied","_id name email experience skills education pic")
       .then(posts=>{
       
            // console.log("postshhhh",posts)
                res.json({posts})
        
       }).catch(err=>{
           console.log(err)
       })
 })

 router.put("/applyjob",userlogin,(req,res)=>{
    PostJob.findByIdAndUpdate(req.body.jobId,{
        $push:{applied:req.User}
    },{
        new:true
    }) .populate("postedBy","_id name pic")
    //.populate("comments.postedBy","_id name pic")
    .populate("applied.posts","_id ")
    .populate("applied","_id name" )
    .then(result=>{
            console.log("re",result)
            res.json(result)
    }).catch(err=>{
        console.log(err)
    })
})

router.put("/shortlistjob",adminlogin,(req,res)=>{
    PostJob.findByIdAndUpdate(req.body.jobId,{
        $push:{shortlisted:req.body.User}
    },{
        new:true
    }) .populate("postedBy","_id name pic")
    //.populate("comments.postedBy","_id name pic")
    .populate("shortlisted.postedBy","_id name pic")
    .populate("shortlisted","_id name" )
    .then(result=>{
            console.log("re",result)
            res.json(result)
    }).catch(err=>{
        console.log(err)
    })
})

router.put("/rejectedjob",userlogin,adminlogin,(req,res)=>{
    PostJob.findByIdAndUpdate(req.body.jobId,{
        $pull:{applied:req.body.User},
        $push:{rejected:req.body.User}
    },{
        new:true
    }) .populate("postedBy","_id name pic")
    //.populate("comments.postedBy","_id name pic")
    .populate("Rejected.postedBy","_id name pic")
    .populate("Rejected","_id name" )
    .then(result=>{
            console.log("re",result)
            res.json(result)
    }).catch(err=>{
        console.log(err)
    })
})

router.get("/myposts",adminlogin,(req,res)=>{
    PostJob.find({postedBy:req.Admin._id})
    .populate("postedBy","_id name pic")
    .populate("applied","_id name email experience skills education pic")
    .then(mypost=>{
        res.json({mypost})
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router