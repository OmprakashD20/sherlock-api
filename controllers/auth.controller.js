/* UTILS */
const { hash, verify } = require("../utils/helper.util");

/* MODEL HELPERS */
const { getUser } = require("../models/user.model");
const { createTeam, getTeam } = require("../models/team.model");

/* JWT */
const { createJWT } = require("../services/jwt.service");

/* AUTH CONTROLLERS */
const signUpController = async (req, res) => {
  try {
    const { name, password, sherlockId, watsonId } = req.body;

    //check if sherlock and watson exists
    const sherlock = await getUser(sherlockId);
    if (!sherlock)
      return res.status(404).json({
        message: "Sherlock not found!",
      });

    const watson = await getUser(watsonId);
    if (!watson)
      return res.status(404).json({
        message: "Watson not found!",
      });

    //hash password
    const hashedPassword = await hash(password);

    //create team
    const team = await createTeam(name, hashedPassword, sherlockId, watsonId);

    if (!team) {
      return res.status(409).json({
        message: "Team already exists!",
      });
    }

    res.status(201).json({
      message: "Team created successfully!",
      team,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

const signInController = async (req, res) => {
  try {
    const { name, password, kid, character } = req.body;

    //check if team exists
    const team = await getTeam(name);
    if (!team)
      return res.status(404).json({
        message: "Team not found!",
      });

    //verify password
    const isPasswordValid = await verify(password, team.password);
    if (!isPasswordValid)
      return res.status(401).json({
        message: "Invalid password!",
      });

    //if the password is valid, check if the user is a member of this team
    const user = await getUser(kid);

    //check if the user is sherlock or watson
    if (team.sherlock !== user.id && team.watson !== user.id)
      return res.status(401).json({
        message: "You are not a member of this team!",
      });

    //check if the user's character is correct
    if (
      (team.sherlock === user.id && character !== "sherlock") ||
      (team.watson === user.id && character !== "watson")
    )
      return res.status(401).json({
        message: "Your character is incorrect!",
      });

    //create jwt
    const token = createJWT(team.id, kid);

    res.status(200).json({
      message: "Logged in successfully!",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

module.exports = { signUpController, signInController };
