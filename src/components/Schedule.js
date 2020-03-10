import React, { useEffect } from "react";

export default () => {
  const healcodeWidget = () => ({
    __html: `<healcode-widget
      data-type="schedules"
      data-widget-partner="object"
      data-widget-id="98123995826c"
      data-widget-version="1"
      >
        <style>*{border: 1px solid red;}</style>
      </healcode-widget>`
  });

  return (
    <div
      className="container border p-0 h-100 overflow-auto"
      dangerouslySetInnerHTML={healcodeWidget()}
    ></div>
  );
};
