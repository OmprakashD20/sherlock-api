import { Request, Response } from "express";

//utils
import { hashData, verifyData, createJWT } from "@/utils";
import { SignInSchemaType, SignUpSchemaType } from "@/validators";

//services
import {
  checkIfUserExists,
  createNewTeam,
  findTeamByName,
  getSherlockCurrentQuestion,
  getWatsonCurrentQuestion,
  setLogInStatus,
} from "@/services";

export const signUpController = async (
  req: Request<{}, {}, SignUpSchemaType>,
  res: Response
) => {
  try {
    const { name, password, sherlock, watson, sherlockMail, watsonMail } =
      req.body;

    //check if team already exists
    if (await findTeamByName(name.toLowerCase()))
      return res.status(400).json({
        error: "Team with this name is already investigating the case!!",
      });

    if (await checkIfUserExists(sherlock))
      return res.status(400).json({
        error: "Sherlock, you are already investigating the case!!",
      });

    if (await checkIfUserExists(watson))
      return res.status(400).json({
        error: "Watson, you are already investigating the case!!",
      });

    //hash password
    const hashedPassword = await hashData(password);

    //create new team
    const newTeam = await createNewTeam({
      name: name.toLowerCase(),
      password: hashedPassword,
      sherlock,
      watson,
      sherlockMail,
      watsonMail,
    });

    if (!newTeam)
      return res.status(500).json({
        error: "Internal Server Error!!",
      });
    res.status(201).json({
      message: "Start investigating the case!!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};

export const signInController = async (
  req: Request<{}, {}, SignInSchemaType>,
  res: Response
) => {
  try {
    const { name, email, password, kid, character } = req.body;

    //check if team exists
    const team = await findTeamByName(name);

    if (!team)
      return res.status(404).json({
        error: "You are not investigating the case!!",
      });

    //verify password
    const isPasswordValid = await verifyData(password, team.password);

    if (!isPasswordValid)
      return res.status(401).json({
        error: "Invalid password!!",
      });

    //check if the user is trying to login as the correct character
    if (character === "sherlock") {
      if (!team.sherlock || team.sherlock !== kid)
        return res.status(401).json({
          error: "Invalid character!!",
        });
      if (team.sherlockMail !== email)
        return res.status(401).json({
          error: "Invalid email!!",
        });
      await setLogInStatus(team.id);
    }

    if (character === "watson") {
      if (!team.watson || team.watson !== kid)
        return res.status(401).json({
          error: "Invalid character!!",
        });
      if (team.watsonMail !== email)
        return res.status(401).json({
          error: "Invalid email!!",
        });
      await setLogInStatus(team.id);
    }

    //create JWT
    const token = createJWT(kid, team.id, email);

    let currentQn = 1;

    if (character === "sherlock")
      currentQn = await getSherlockCurrentQuestion(team.id);
    if (character === "watson")
      currentQn = await getWatsonCurrentQuestion(team.id);

    res.status(200).json({
      message: `Good luck on your case, ${character[0].toUpperCase()}${character.slice(
        1
      )}!!`,
      token,
      name: team.name,
      character,
      email,
      kid,
      currentQn: currentQn + 1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};
