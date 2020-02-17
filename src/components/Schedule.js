import React, { useEffect } from "react";
import load from "load-script";

export default () => {
  useEffect(() => {
    load(
      `https://widgets.healcode.com/javascripts/healcode.js`,
      (err, script) => {
        if (err) {
          console.log(err);
        } else {
          console.log(script.src);
          //           if (window.hcWidgetCollection)
          //   window.healcodeInitialize(window.hcWidgetCollection);
        }
      }
    );
  });
  return (
    <div className="container border p-0 h-100 overflow-auto">
      {/* <script
        src="https://widgets.healcode.com/javascripts/healcode.js"
        type="text/javascript"
      ></script> */}

      <healcode-widget
        data-type="schedules"
        data-widget-partner="object"
        data-widget-id="98123995826c"
        data-widget-version="1"
      ></healcode-widget>
    </div>
  );
};