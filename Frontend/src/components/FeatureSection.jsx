import { IconTruck, IconCertificate, IconCoin } from "@tabler/icons-react";

function FeatureSection() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "20px 50px",
      }}
    >
      <FeatureCard
        title="Free Worldwide shipping"
        icon={<IconTruck size={50} stroke={1} color="#228be6" />}
      />
      <FeatureCard
        title="Best Quality Product"
        icon={<IconCertificate size={50} stroke={1} color="#228be6" />}
      />
      <FeatureCard
        title="Very Affordable Pricing"
        icon={<IconCoin size={50} stroke={1} color="#228be6" />}
      />
    </div>
  );
}

export default FeatureSection;

function FeatureCard({ title, icon }) {
  return (
    <div style={{ width: "400px", height: "200px", position: "relative" }}>
      <div
        style={{ width: "200px", height: "100px", backgroundColor: "#e7f5ff" }}
      >
        <h1
          style={{
            fontFamily: "Open Sans",
            fontSize: "24px",
            position: "absolute",
            top: "50px",
          }}
        >
          {title}
        </h1>
        {icon}
      </div>
      <div className="feature-card-content">
        <p style={{ fontFamily: "Open Sans", fontSize: "12px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
          architecto iure, accusantium iste magnam
        </p>
      </div>
    </div>
  );
}
