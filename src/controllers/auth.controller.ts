import { Request, Response } from "express";

//utils
import { hashData, verifyData, createJWT } from "@/utils";
import { SignInSchemaType, SignUpSchemaType } from "@/validators";

//services
import { createNewTeam, findTeamByName } from "@/services";

export const signUpController = async (
  req: Request<{}, {}, SignUpSchemaType>,
  res: Response
) => {
  try {
    const { name, password, sherlock, watson } = req.body;

    //check if team already exists
    if (await findTeamByName(name))
      return res.status(400).json({
        error: "Team already exists!!",
      });

    //hash password
    const hashedPassword = await hashData(password);

    //create new team
    const newTeam = await createNewTeam({
      name,
      password: hashedPassword,
      sherlock,
      watson,
    });

    if (!newTeam)
      return res.status(500).json({
        error: "Internal Server Error!!",
      });
    res.status(201).json({
      message: "Team created successfully!!",
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
    const { name, password, kid, character } = req.body;

    //check if team exists
    const team = await findTeamByName(name);

    if (!team)
      return res.status(404).json({
        error: "Team not found!!",
      });

    //verify password
    const isPasswordValid = await verifyData(password, team.password);

    if (!isPasswordValid)
      return res.status(401).json({
        error: "Invalid password!!",
      });

    //check if the user is trying to login as the correct character
    if (character === "sherlock")
      if (!team.sherlock || team.sherlock !== kid)
        return res.status(401).json({
          error: "Invalid character!!",
        });

    if (character === "watson")
      if (!team.watson || team.watson !== kid)
        return res.status(401).json({
          error: "Invalid character!!",
        });

    //create JWT
    const token = createJWT(kid, team.id);

    res.status(200).json({
      message: "Login successful!!",
      token,
      name: team.name,
      character,
      kid,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error!!",
    });
  }
};
