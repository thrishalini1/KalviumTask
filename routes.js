const express = require('express');
const router = express.Router();
const History = require('./model');
const path = require('path');



router.get('/', (req,res) => {
    try{
        const filePath = path.join(__dirname, 'views/list.html');
        res.sendFile(filePath);
    }
    catch{
        res.status(500).json({"messsage":"Something went wrong. oops!"});
    }

})

router.get('/history',async(req,res)=>{
    try{
        const allHistory = await History.find({});
        res.render('history', { history: allHistory });
        // res.send(allHistory)
    }
    catch(err){
        console.error('Caught error:', err.message);
        res.status(500).json({"messsage":"Something went wrong. oops!"});
    }

})

router.get('/:expression*',async (req,res) => {
    const expression = req.params.expression + req.params[0];
    console.log(expression);

    let t =''
    let p=''
    for(let i=0;i<expression.length;i++){
        if(expression[i]=='/'){

        }
        else if(expression[i+1]!='/'&&i!=(expression.length-1))
            {
                t+=expression[i];
            }
        else if(expression[i+1]=='/'||i==(expression.length-1)){
                t+=expression[i]
                switch(t){
                    case "into":
                        p+="*";
                        break;
                    
                    case "plus":
                        p+="+";
                        break;
                    
                    case "minus":
                        p+="-";
                        break;
                    
                    case "division":
                        p+="/";
                        break;

                    case "modulo":
                        p+="%";
                        break;
                    
                    case "openB":
                        p+="("
                        break;

                    case "closeB":
                        p+=")"
                        break;

                    default:
                        p+=t;
                }
                t='';
        }
        
    }

    console.log(p);
    const result = eval(p);
    
    const roundedResult = parseFloat(result.toFixed(3));
    History.insertMany({
         question:p,
         answer:roundedResult 
        })
    
    const allHistory = await History.find({});
    const totalHistoryCount = allHistory.length;

    if (totalHistoryCount > 20) {
          const firstRecord = allHistory[0];
          await History.deleteOne({ _id: firstRecord._id });
    }
    console.log(roundedResult)
    res.json({ question:p, answer:roundedResult });
    // res.json('works')
})




module.exports = router;
