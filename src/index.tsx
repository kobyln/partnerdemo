import * as React from "react";
import * as ReactDOM from "react-dom";
import PropViewer from 'react-prop-viewer';

import "./index.css";

import {
  LoginUtils,
  ILoginWebResponse,
  BaseIdentifyingInformation,
  UserManager,
  LoginStatus,
  SsoLoginRequest ,
} from "ethos-js-client";

const webServiceUrl = "https://partnerdemo.us-east-2.aws.dev.ins11.lnrs.io";
// const webServiceUrl = "http://localhost:5000";

class LoginComponent extends React.Component<any, any> {
  state: any = {};
  componentDidMount() {
    let ssoRequest: SsoLoginRequest = {
      providerId: "ethos_sso_key",
      // JWT Encoded with secret 'mysecret'
      // You can encode it at jwt.io
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdHVzZXIzIiwiZW1haWwiOiJhQGIuY29tIiwiZmlyc3RuYW1lIjoiZmlyc3QiLCJsYXN0bmFtZSI6Imxhc3QiLCJwaG9uZSI6IjEyMzQ1Njc4OTAifSwiZm9ybURhdGEiOnsieW91ciI6ImluZm8gaGVyZSIsIndlIjoid2lsbCBwYXNzIHRoZSAneW91cicgYmxvY2sgYmFjayB0byB0aGUgYXBwIn0sImFnZW5jeU9yaSI6Ik1BMzk5OTk5OSIsImlhdCI6MTUxNjIzOTAyMn0.LRK7nvP_XGQWvhv6CyLl5YuS59l2L1S9ciCSdW0bCkE",
      type: "JWT",
      applicationId: 7,
      ipAddress: ""
    };

    LoginUtils.loginWithToken(ssoRequest, webServiceUrl).then((result: ILoginWebResponse) => {
      if (result.loginStatus === LoginStatus.Success) UserManager.saveLoginInfoToLocalStore(ssoRequest.token, result);

      this.setState({result: result});
    });
  }

  render() {
    let response = this.state.result as ILoginWebResponse;
    if (!response) {
      return <div>Please wait...</div>;
    }

    console.log([response]);

    return <PropViewer loginData={response}/>;
  }
}

ReactDOM.render(<LoginComponent />, document.getElementById("root"));
