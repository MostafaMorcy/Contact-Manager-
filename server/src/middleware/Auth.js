import jwt from 'jsonwebtoken'
export const userAuth=(req,res,next)=>{
    const token = req.header("token");
    jwt.verify(token,process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        res.json({ message: "invalid token ", err });
      }else{
console.log(decoded);
req.userId=decoded.userId
next()
      }
    })
}