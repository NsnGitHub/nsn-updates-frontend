import React, { useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { getJoinMonthYearFromDateTimeString } from "@/util/convertDateTimeString";
import { Button } from "./ui/button";

const sampleUser = {
  username: "test2",
  displayName: "Test User",
  // bio: "Highly motivated software developer with a deep passion for building scalable, high-performance web applications. With a strong foundation in Java and Spring Boot, I specialize in developing backend systems that are both secure and efficient. I have hands-on experience with RESTful API design, JWT-based authentication, and crafting clean, maintainable code using best practices like dependency injection and SOLID principles. My expertise also extends to database design and management, where I leverage tools like PostgreSQL and JPA/Hibernate to create efficient and scalable database structures. I’m well-versed in using Testcontainers for integration testing and ensuring code quality through rigorous unit testing. In addition to my technical skills, I’m experienced in collaborating on cross-functional teams, leading projects from conception to deployment, and continuously improving processes. I’m passionate about learning new technologies, staying current with industry trends, and applying my knowledge to solve complex problems that deliver real-world value. Always eager to take on new challenges!",
  bio: "Hello, I am just a test user with a test bio",
  privacySetting: "FOLLOWER",
  createdAt: "2024-10-04T23:24:42.245991Z",
  numberOfFollowers: 0,
  numberFollowing: 0,
};

export default function UserProfile() {
  const [expandedBio, setExpandedBio] = useState<boolean>(false);
  return (
    <div className="flex justify-center items-center w-[80ch] place-self-center border rounded-lg px-12 py-8">
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-row">
          <UserProfileHeader username={sampleUser.username} displayName={sampleUser.displayName} />
          <Button className="ml-auto bg-blue-500">Follow</Button>
        </div>

        {sampleUser.privacySetting == "PRIVATE" ? (
          <div>PRIVATE ACCOUNT</div>
        ) : (
          <>
            {sampleUser.bio.length > 250 ? (
              <p>
                {`${!expandedBio ? `${sampleUser.bio.slice(0, 250)}...` : sampleUser.bio}`}
                <p className="text-blue-500 mt-4 hover:cursor-pointer" onClick={() => setExpandedBio((prev) => !prev)}>
                  {!expandedBio ? "View More" : "View Less"}
                </p>
              </p>
            ) : (
              <p>{sampleUser.bio}</p>
            )}
            <div className="flex flex-row gap-4">
              <span>{sampleUser.numberFollowing} Following</span>
              <span>{sampleUser.numberOfFollowers} Followers</span>
              <span className="ml-auto">{`Joined ${getJoinMonthYearFromDateTimeString(sampleUser.createdAt)}`}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
