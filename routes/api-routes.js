const Workout = require("../models/workout");
const router = require("express").Router();


router.get("/api/workouts", ({ body }, res) => {
    Workout.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});
  

// uses id push req dadta
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        {
            $push: {
                exercises: req.body
            }
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
});

//gets range
router.get("/api/workouts/range", (req, res) => {
    var d = new Date();
    d.setDate(d.getDate() - 7)
    Workout.find({ day: { "$gte": d } }, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});


// creates posts workout
router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then(dbWorkout => {
            console.log(dbWorkout);
        })
        .catch((error) => {
            console.log(error);
        });
});





module.exports = router;