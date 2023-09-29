


# Mastering React Test-Driven Development - Second Edition

<a href="https://www.packtpub.com/product/mastering-react-test-driven-development-second-edition/9781803247120"><img src="https://static.packt-cdn.com/products/9781803247120/cover/smaller" alt="Mastering React Test-Driven Development." height="256px" align="right"></a>

This is the code repository for [Mastering React Test-Driven Development - Second Edition](https://www.packtpub.com/product/mastering-react-test-driven-development-second-edition/9781803247120), published by Packt.

**Build simple and maintainable web apps with React, Redux, and GraphQL**

## What is this book about?
Test-driven development (TDD) is a programming workflow that helps you build your apps by specifying behavior as automated tests. The TDD workflow future-proofs apps so that they can be modified without fear of breaking existing functionality. Another benefit of TDD is that it helps software development teams communicate their intentions more clearly, by way of test specifications.

This book covers the following exciting features: 
* Build test-driven applications using React 18 and Jest
* Understand techniques and patterns for writing great automated tests
* Use test doubles and mocks effectively
* Test-drive browser APIs, including the Fetch API and the WebSocket API
* Integrate with libraries such as React Router, Redux, and Relay (GraphQL

If you feel this book is for you, get your [copy](https://www.amazon.com/dp/1803247126) today!

<a href="https://www.packtpub.com/?utm_source=github&utm_medium=banner&utm_campaign=GitHubBanner"><img src="https://raw.githubusercontent.com/PacktPublishing/GitHub/master/GitHub.png" 
alt="https://www.packtpub.com/" border="5" /></a>


## Instructions and Navigations
All of the code is organized into folders. For example, Chapter02.

The code will look like the following:
```
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <AppointmentsDayView
    appointments={sampleAppointments}
  />
);
```

**Following is what you need for this book:**
This book is for frontend developers who are looking to improve their testing practices and increase the quality and maintainability of their applications. To make the most of this book, you’ll need knowledge of the JavaScript programming language.

With the following software and hardware list you can run all code files present in the book (Chapter 1-19).

### Software and Hardware List

| Chapter  | Software required                   | OS required                        |
| -------- | ------------------------------------| -----------------------------------|
| 1-19        | npm                    | Windows, Mac OS X, and Linux  |


We also provide a PDF file that has color images of the screenshots/diagrams used in this book. [Click here to download it](https://packt.link/5dqQx).

## What's in this repository

This repository stores the source code for two JavaScript web applications which have been produced using a test-driven development (TDD) workflow. In addition to the application code, there are almost 500 Jest unit tests and also some Cucumber tests that utilise Puppeteer.

You'll find a list of directories, `Chapter01` through `Chapter18`, that follow the first eighteen chapters of the book.

`Chapter01` to `Chapter13` cover an application called _Appointments_, which is an appointment booking system for hair salons.

`Chapter14` to `Chapter18` cover an application called _Spec Logo_, which is an implementation of the Logo programming environment.

These directories contains the following subfolders:
   * `Start`, which contains the code that begins the chapter. All the code samples and walkthroughs are built on top of this directory. If you're following along with the book, you'll want to use this start point.
   * `Exercises`, which contains the code at the end of the chapter, without any of the chapter exercises completely. If you're not following along but you do want to try the exercises, you'll want to start here.
   * `Complete`, which contains solutions to the exercises.

(Not all chapters have exercises, and `Chapter11` has no walkthrough.)

## What's not in this repository

The book has a final chapter, Chapter 19, _Understanding TDD in the Wider Testing Landscape_, that has no code :)

## How to use this repository

### If you don't have the book...

If you're interested in seeing the complete solutions to these applications, together with their implementations and all of the tests, take a look in `Chapter13/Complete` (for _Appointments_) and `Chapter18/Complete` (for _Spec Logo_), or you can look at the head of the `appointments` and `spec-logo` branches.

### Following along with the book

If you're using the book, please fork the repository and clone it on your local machine. Then you can start pushing your own commits as you work along with the book.

### Running tests

You'll need to have Node installed and a code editor of your choice.

1. Make sure you've cloned the repo.
2. In a terminal, navigate to the directory of your choice, e.g. `Chapter18/Complete`.
3. Run `npm install`.
4. Run `npm test`.

You can also run an individual test file by appending the test file path, for example, `npm test test/CustomerForm.test.js`.

### Building and running the app

#### For Chapter 1 through 5:

In the first 5 chapters, there's no server, so after building the app you'll need to navigate to the `dist/index.html` file in your browser.

1. Run `npm run build`.
2. Run `open dist/index.html` to open the application in your browser. If this step doesn't work, open your web browser manually and then paste in the full file path into the location bar.

_Note_: if you see a blank screen, check your console for errors, and see the [Troubleshooting](#troubleshooting) section at the bottom of this document.

#### From Chapter 6 onwards:

1. Run `npm run build`.
2. Run `npm run serve`.
3. Navigate to `http://localhost:3000` in your browser.

If port 3000 is in use or you'd rather use another port, you can use `PORT=8080 npm run serve`.

As the chapters progress, the build script will build not just the source code you're working on, but also the Node server application and the Relay GraphQL compiler.

### Other commands you can run

You can use `npm run lint` to see any linting issues using ESLint, and `npm run format` to format the source code using Prettier.

If you're playing around with the server source, you can use `npm run build-server` and `npm run test-server`.

### Viewing the commit history

There are two branches, `appointments` and `spec-logo` that were used during the writing process and show the history of how the application was built. You are welcome to inspect and use those too. All of the chapter directories in the `main` branch were auto-generated from these branches.

## Troubleshooting

### I see a white screen when I load dist/index.html

You may need to enable local file access in your browser. Take a look in the developer console and it should give you instructions for what to do.

(In Safari on MacOS, you need to select _Develop > Disable Local File Restrictions_.)

### Some other problem?

Please create a new Issue in the repository and I'll do my best to assist you.

## Other topics

### Why did you use library _x_ instead of _y_?

Because I preferred _x_ over _y_. This applies to the following, but note this list is probably not exhaustive:

| Book's choice | Another choice | Why? |
| ------------- | -------------- | ---- |
| Hand-rolled test library | React Testing Library | (I believe) you'll learn more this way. |
| Jest | Mocha | (I actually prefer Mocha, but) Jest is what most React developers are familiar with. See the [How can I use Mocha instead of Jest?](#how-can-i-use-mocha-instead-of-jest) section below. |
| Cucumber/Puppeteer | Cypress | I dislike that Cypress has an API that is unique to its product, whereas Puppeteer is a bolt-on to all the standard unit testing techniques, and Cucumber is a transferable skill because it has integrations for many different languages and runtimes.|
| Relay | Apollo | (I believe) Relay is simpler. |
| Redux saga | Redux thunk | (I believe) Sagas are more complicated, so at this point in this book it's a more interesting choice. |

### How can I use Mocha instead of Jest?

For the most part, there's a 1-to-1 mapping between the Jest API and the Mocha API. I maintain a page at https://reacttdd.com/migrating-from-jest-to-mocha that you can use as a quick guide to using Mocha rather than Jest as you go through the book.

### Related products <Other books you may enjoy>
* A Frontend Web Developer’s Guide to Testing [[Packt]](https://www.packtpub.com/product/a-front-end-web-developer-s-guide-to-testing/9781803238319) [[Amazon]](https://www.amazon.com/dp/1803238313)

* React 17 Design Patterns and Best Practices - Third Edition [[Packt]](https://www.packtpub.com/product/react-17-design-patterns-and-best-practices-third-edition/9781800560444) [[Amazon]](https://www.amazon.com/dp/1788293770)

## Errata 
 * Page 89 (step 5):  **The function handleSubmit is defined like this:**
``` 
const handleSubmit = (event) => {
  event.preventDefault();
  onSubmit(original);
};
```
* On page 93, before running step 10, you’ll also need to update handleSubmit to submit the current customer value rather than the original value, like this:**
``` 
const handleSubmit = (event) => {
  event.preventDefault();
  onSubmit(customer);
};
```

* Page 9 The result of running “npm test” on this step is slightly different, due to updates to the Jest module:
```
 FAIL  test/Appointment.test.js
  ● Test suite failed to run

    Your test suite must contain at least one test.
```
However, everything else remains the same.

* Page 24 The code snippet in test 7 should read as follows:
```
import React from "react";
export const Appointment = ({ customer }) => (
  <div>{customer.firstName}</div>
);
```
If you do not include the first line, as in the book text, you’ll get the following error when you run step 8:

```
● Appointment › renders another customer first name

    ReferenceError: React is not defined

    > 1 | export const Appointment = ({ customer }) => <div>{customer.firstName}</div>;
        |                                       ^
      2 |
```


## Get to Know the Author
**Daniel Irvine**
is a software consultant based in London. He works with a variety of languages including C#, Clojure, JavaScript, and Ruby. He’s a mentor and coach for junior developers and runs TDD and XP workshops and courses. When he’s not working, he spends time cooking and practicing yoga. He co-founded the Queer Code London meetup and is an active member of the European software craft community.

## Get in touch

You can contact the author directly by raising Issues here in GitHub, or via his website at [danielirvine.com](https://danielirvine.com).


### Download a free PDF

 <i>If you have already purchased a print or Kindle version of this book, you can get a DRM-free PDF version at no cost.<br>Simply click on the link to claim your free PDF.</i>
<p align="center"> <a href="https://packt.link/free-ebook/9781803247120">https://packt.link/free-ebook/9781803247120 </a> </p>
