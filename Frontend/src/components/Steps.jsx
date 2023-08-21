import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import CartScreen from "../screens/CartScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen";

function Steps() {
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
   const screenWidth = window.innerWidth;

  const handleStepChange = (nextStep) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  const shouldAllowSelectStep = (step) =>
    highestStepVisited >= step && active !== step;
    const STEPPER_STYLE= screenWidth >1000 && {
      padding: "0 100px",
    }

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        sx={STEPPER_STYLE}
        
      >
        <Stepper.Step
          label="Cart"
          description="Check your cart"
          allowStepSelect={shouldAllowSelectStep(0)}
          
        >
          <CartScreen handleStepChange={handleStepChange} active={active} />
        </Stepper.Step>
        <Stepper.Step
          label="Shipping"
          description="Add your address"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          <ShippingScreen
            handleStepChange={handleStepChange}
            active={active}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Payment"
          description="select payment method"
          allowStepSelect={shouldAllowSelectStep(2)}
        >
          <PaymentScreen />
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position='center'  mt="xl">
        <Button variant="default"  onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
      </Group>
    </>
  );
}

export default Steps;
