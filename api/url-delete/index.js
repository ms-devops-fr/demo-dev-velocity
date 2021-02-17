require('dotenv').config();
const yup = require('yup');

const monk = require('monk');
const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');

const slugSchema = yup.string().trim().matches(/^[\w\-]+$/i);

module.exports = async function (context, req) {
    const { id: slug } = req.params;
    context.db = db;

    console.log({slug})

    try {
        slugSchema.validate(slug);
        const { result } = await urls.remove({slug});

        if(result.ok) {
            context.res.status = 200
        }

        else {
            context.res = {
                status: 404,
                body: 'slug not found'
            }
        }
    }
    catch(error) {
        console.log(error);

        context.res = {
            status: 500,
            body: error
        }
    }    
}