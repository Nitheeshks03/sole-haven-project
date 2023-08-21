import { Notification } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useState, useEffect } from "react";

function Success({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            right: "50%",
            translate: "50%",
            zIndex: "5000",
          }}
        >
          <Notification icon={<IconCheck size="1.1rem" />} color="teal">
            {message}
          </Notification>
        </div>
      )}
    </>
  );
}

export default Success;
