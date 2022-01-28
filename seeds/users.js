exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "laysha",
          password:
            "$2a$08$xQKFFE22pgd8se9F368zH.L6USTChYHPiy5OQzrtGyInA0uYrncjy",
        },
        {
          id: 2,
          username: "javy",
          password:
            "$2a$08$hSWZwOhgQZsH/iKdFBMKL.jG65sDFjOMISjBcXHd6pd3QQORfsQW6",
        },
        {
          id: 3,
          username: "javier",
          password:
            "$2a$08$0L3vlez0msjiPVBe69mWQ.colk6GearehMoj6FUdNaOtPGXd/dHY.",
        },
      ]);
    });
};
