const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const myStorage = admin.storage();
const nodemailer = require('nodemailer');

//when this cloud function is already deployed, change the origin to your app link
const cors = require('cors')({ origin: true });

//create and config transporter
let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure: true, // true for 465, false for other ports
    auth: {
      user:"tintingm89@gmail.com",
      pass:"tintin89*",
    },
  });

  

//export the cloud function called `sendEmail`
exports.sendEmail = functions.https.onRequest((req, res) => {
    //for testing purposes
    console.log(
      'from sendEmail function. The request object is:',
      JSON.stringify(req.body)
    );
  
    //enable CORS using the `cors` express middleware.
    cors(req, res, () => {
      //get contact form data from the req and then assigned it to variables
      const email = req.body.data.email;
      const name = req.body.data.name;
      const address = req.body.data.address;
      const phoneNumber = req.body.data.phoneNumber;
      const comments = req.body.data.comments;
  
      //config the email message
      const mailOptions = {
        from: email,
        to: `tintingm89@gmail.com`,
        subject: `from ${name} submited by SA Meals`,
        text: `${name} says: ${comments}.\n address: ${address}.\n email:${email} \n phone:${phoneNumber}`,
      };
  
      //call the built in `sendMail` function and return different responses upon success and failure
      return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send({
            data: {
              status: 500,
              message: error.toString(),
            },
          });
        }
  
        return res.status(200).send({
          data: {
            status: 200,
            message: 'sent',
          },
        });
      });
    });
  });

  exports.deletePictures = functions.firestore.document('restaurants/{id}').onDelete(async (snap,context)=>{
    
    const idRestaurants = context.params.id;
     
    const bucket = myStorage.bucket();
    
    return bucket.deleteFiles({
        prefix:`pictures/${idRestaurants}`
    });
});
