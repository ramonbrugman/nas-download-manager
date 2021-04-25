import * as React from "react";
import classNames from "classnames";

import { errorMessageFromCode, errorMessageFromConnectionFailure } from "../common/apis/errors";
import { ConnectionTestResult, isErrorCodeResult } from "./settingsUtils";

export interface Props {
  testResult: "none" | "in-progress" | ConnectionTestResult;
  reassureUser: boolean;
}

export class ConnectionTestResultDisplay extends React.PureComponent<Props, {}> {
  render() {
    const { testResult, reassureUser } = this.props;

    if (testResult === "none") {
      return this.renderResult();
    } else if (testResult === "in-progress") {
      const text = reassureUser
        ? browser.i18n.getMessage("Testing_connection_this_is_unusually_slow_is_your_NAS_asleep")
        : browser.i18n.getMessage("Testing_connection");
      return this.renderResult(text, "fa-sync fa-spin");
    } else if (testResult === "success") {
      return this.renderResult(
        browser.i18n.getMessage("Connection_successful"),
        "fa-check",
        "intent-success",
      );
    } else if (isErrorCodeResult(testResult)) {
      return this.renderResult(
        errorMessageFromCode(testResult.failureCode, "Auth"),
        "fa-times",
        "intent-error",
      );
    } else {
      return this.renderResult(
        errorMessageFromConnectionFailure(testResult),
        "fa-times",
        "intent-error",
      );
    }
  }

  private renderResult(text?: React.ReactNode, icon?: string, className?: string) {
    return (
      <span className={classNames("connection-test-result", className)}>
        {icon && <span className={classNames("fa", icon)} />}
        {text}
      </span>
    );
  }
}
