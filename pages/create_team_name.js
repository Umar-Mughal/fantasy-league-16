// Packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

// Components
import Layout from "components/layout";
import Button from "components/html/Button";
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";

// API
import { createFantasyTeam } from "redux/FantasyTeams/api";

// Loader
import Loader from "components/loaders/Loader";
import {
  fantasyTeamCreationFailed,
  fantasyTeamCreationSuccess,
} from "redux/FantasyTeams/actionCreators";

// Constants
import {
  POSITION_DEF,
  POSITION_FWD,
  POSITION_GK,
  POSITION_MID,
} from "constants/data/filters";

// Styles
const getStyles = (R) => {
  return {
    container: {
      paddingTop: R(34),
      paddingBottom: R(220),
      minHeight: R(),
    },
    logo: {
      width: R(164),
      height: R(40),
      marginBottom: R(146),
    },
    content: {
      width: R(555),
    },
    heading: {
      fontSize: R(50),
      marginBottom: R(24),
      lineHeight: R(56, "px"),
    },

    subHeading: {
      fontSize: R(18),
      marginBottom: R(86),
      opacity: 0.7,
    },
    input: {
      height: R(100),
      fontSize: R(36),
      background: "transparent",
      color: "white",
      border: "none",
    },
    border: {
      border: "1px solid white",
      marginTop: R(-20),
    },
    button: {
      width: R(412),
      marginTop: R(100),
    },
  };
};

export default function ConfirmAccount() {
  const STYLES = { ...getStyles(R) };

  const router = useRouter();
  const dispatch = useDispatch();

  // const [teamName, setTeamName] = useState("Champions FC");
  const [teamName, setTeamName] = useState("");
  const teamAlreadyExists = useSelector(({ auth }) => auth.user.fantasyTeamId);

  const teamData = useSelector(
    ({ fantasyTeam }) => fantasyTeam.savedFantasyTeamOnRedux
  );
  const loadingFantasyTeamCreation = useSelector(
    ({ fantasyTeam }) => fantasyTeam.loadingFantasyTeamCreation
  );

  /***** Create Team Handler *******/
  const handleOnClick = async () => {
    if (!teamName) {
      return toast.error("Please enter team name !!!");
    }

    const { squadInfo } = JSON.parse(teamData);

    const { squad } = squadInfo;

    const dataInput = {
      goalkeepers: squad[POSITION_GK].map((p, pitchIndex) => {
        return {
          id: p.id,
          pitchIndex,
        };
      }),
      defenders: squad[POSITION_DEF].map((p, pitchIndex) => {
        return {
          id: p.id,
          pitchIndex,
        };
      }),
      midfielders: squad[POSITION_MID].map((p, pitchIndex) => {
        return {
          id: p.id,
          pitchIndex,
        };
      }),
      forwards: squad[POSITION_FWD].map((p, pitchIndex) => {
        return {
          id: p.id,
          pitchIndex,
        };
      }),
      name: teamName,
    };

    if (!isEmpty(dataInput)) {
      const { success, msg } = await dispatch(createFantasyTeam(dataInput));

      // Toast
      if (success) {
        toast.success(msg, {
          onClose: () => {
            dispatch(fantasyTeamCreationSuccess());
            return router.push({
              pathname: "/team_created",
              query: {
                teamCreated: true,
              },
            });
          },
        });
      } else {
        toast.error(msg, {
          onClose: () => dispatch(fantasyTeamCreationFailed()),
        });
      }
    }
  };

  useEffect(() => {
    if (teamAlreadyExists) {
      return router.push("/my_squad_game_week");
    }
    if (!teamData) {
      router.push("/build_team_all_players");
    }
  }, []);

  if (!teamData || teamAlreadyExists) return <Loader />;

  return (
    <Layout title="Create Your Team Name" showToast>
      <Div
        className="bg-[url('/images/bg_dark_blue.png')] bg-[length:100%_100%] bg-no-repeat  w-full"
        style={STYLES.container}
      >
        <div className="flex flex-col items-center justify-center">
          <div style={STYLES.content}>
            <div className="w-full flex items-center justify-center">
              <div style={STYLES.logo}>
                <img
                  src="/images/logo_white.png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </div>
            <p
              className="text-white font-[800]  text-center italic uppercase"
              style={STYLES.heading}
            >
              come up with a <br />
              name for your team
            </p>
            <p
              className="normal text-center text-link_water"
              style={STYLES.subHeading}
            >
              You can edit your team name any time.
            </p>
            <input
              className={"disable-input-outline font-[900] italic"}
              type="text"
              style={STYLES.input}
              placeholder={"Champions FC"}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <hr className={"w-full"} style={STYLES.border} />
            <div className="w-full flex items-center justify-center">
              <div style={STYLES.button}>
                <Button
                  title={"CONFIRM"}
                  onClick={handleOnClick}
                  disabled={loadingFantasyTeamCreation}
                />
              </div>
            </div>
          </div>
        </div>
      </Div>
    </Layout>
  );
}
