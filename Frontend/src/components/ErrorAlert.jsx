import { useState, useEffect } from "react";
import { Notification } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

function ErrorAlert({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{position:'absolute',top:'100px', right:'50%',translate:'50%',zIndex:'5000'}}>
      {isVisible && (
        <Notification
          icon={<IconX size="1.1rem" />}
          color="red"
          sx={{
            zIndex: "2000",
          }}
        >
          {message}
        </Notification>
      )}
    </div>
  );
}

export default ErrorAlert;
