import React, { Suspense } from "react";
import "./index.scss";
import Loading from "./components/loader";
import { saveUser, getUser, clearStorage } from "./services/storage";
import * as path from "./routes/constants";
import { parseToken } from "./services/helper";
import { notifError, notifSuccess } from "./routes/util";
import { CONSTANTS } from "./routes/constants";
import OneSignal from "react-onesignal";

const Routes = React.lazy(() => import("./routes"));

class RouteContainer extends React.PureComponent {
    state = {
        role: null,
        loading: false,
    };

    componentDidMount = async () => {
        this.setState({ loading: true });
        let user = getUser();
        console.log("USER: ", user);
        if (user) {
            let { role } = user;
            if (role) this.setState({ role });
        }
        // let options = {
        // 	subdomainName: "piltab3000",
        // 	allowLocalhostAsSecureOrigin: true,
        // 	notifyButton: {
        // 		enable: true,
        // 	},
        // };
        // OneSignal.initialize("eeb06e92-f2e7-4df2-a61c-3e5b6558051f", options);
        // const playerId = await OneSignal.getPlayerId();
        // console.log("playerId", playerId);
        this.setState({ loading: false });
    };

    onLogin = async (token, router) => {
        console.log("login");
        if (localStorage.getItem("checkCalling") !== null) {
            notifSuccess("*","Successfully Login");
            saveUser(token);        
            localStorage.removeItem("checkCalling");
            window.location.href = "/videoCalling";
        } else {
            clearStorage();
            let { role, payment, shipping, billing ,loginCount} = parseToken(token);	
           
            if (role === "User") {
                notifError(error);
                // router.push({
                //     pathname: path.BILLING,
                //     state: { paymentPending: true, token },
                // });
            } else {
				notifSuccess("", "Successfully logged in");
				saveUser(token);
             
              
				if(role==="User")
				localStorage.setItem("loginCount",loginCount)
				if (role) {
					this.setState({ role });
					window.location.href = "/";
				}
            }
        }
    };

    render() {
        const { role } = this.state;
        console.log("ROLE:", role);
        return this.state.loading ? null : (
            <Suspense fallback={<Loading show={true} />}>
                <Routes userRole={role} onLogin={this.onLogin} />
            </Suspense>
        );
    }
}

export default RouteContainer;
