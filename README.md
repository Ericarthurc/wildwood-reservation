# Wildwood Reservation

Overview:
This project started as a rewrite of an older PHP project developed in the mid 2000s. The code was impossible for me to reverse engineer because I don’t know PHP and I don’t plan on learning it. The rewrite only takes the original concept of the PHP code and builds upon that; no original code was used.

The original code used a PHP and SQL stack. The project was created to make an easy way for people to reserve ‘seats’ for our Easter/Christmas services and have an email feedback. The original project was never a good solution though; it contained many issues and created more chaos than good.

Issues with original code:

- Unmanageable code
- Built on very old PHP code
- Unfriendly design (no css was used on the original project)
- Difficult to deploy to a server
- Required many database rewrites

New code goals:
The purpose of the rewrite is to bring the code to 2019 standards. I want a project that I understand and that I could teach to someone else in the future. A web app that is easily deployable and uses modern friendly tools.

New code tools:

- MERN Stack
- Mongoose schema
- Express backend
- React frontend
- Nodejs bringing it all together
- SMTP integration with Nodemailer and custom SMTP server
- Bootstrap 4 standards (some custom css)

Todo list:

- [x] Add mailer functionality with my smtp server
- [x] Handle mongoose on Atlas
- [x] Deploy on Heroku
- [x] Clean up the css
- [ ] Clean up react code where I can
- [ ] Refactor and reorganize react code
- [ ] Handle when database is disconnected or service data is invalid

Future list:

- I will probably want to do a PERN stack
  -- PostgreSQL, Express, React, Node
  -- Reason: PostgreSQL is a relational database and I would highly benifit from the rollback feature
