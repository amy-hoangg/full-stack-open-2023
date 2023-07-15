describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "afi",
      username: "ami",
      password: "1234567",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
    cy.login({ username: "ami", password: "1234567" });
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });

  it("login", function () {
    cy.contains("log in").click();
  });
  it("succeeds with correct credentials", function () {
    cy.contains("log in").click();
    cy.get("#username").type("ami");
    cy.get("#password").type("1234567");
    cy.get("#login-button").click();

    cy.contains("afi logged in");
  });

  it("fails with wrong credentials", function () {
    cy.contains("log in").click();
    cy.get("#username").type("amy");
    cy.get("#password").type("h1234567");
    cy.get("#login-button").click();

    cy.get(".error")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get(".success").should("not.exist");

    cy.get("html").should("not.contain", "afi logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("log in").click();
      cy.get("input:first").type("ami");
      cy.get("input:last").type("1234567");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("cypress title");
      cy.get("#author").type("cypress author");
      cy.get("#url").type("cypress url");
      cy.contains("create").click();
    });

    it("can like a blog", function () {
      cy.createBlog({
        title: "cypress title",
        author: "cypress author",
        url: "cypress url",
      });

      // Like the blog
      cy.contains("cypress title cypress author")
        .parent()
        .find("button")
        .click();

      // Verify that the button text changes to "make not important"
      cy.contains("cypress title cypress author")
        .parent()
        .find("button")
        .should("contain", "likes");
    });

    it("user can delete their blog", function () {
      cy.createBlog({
        title: "Test Blog",
        author: "Test Author",
        url: "https://example.com",
      }).then(() => {
        cy.contains("Test Blog").parent().as("blogItem");

        // Click on the delete button
        cy.get("@blogItem").find("button").contains("delete").click();

        // Confirm the deletion
        cy.on("window:confirm", () => true);

        // Assert that the blog is deleted
        cy.get("html").should("not.contain", "Test Blog");
      });
    });

    it("Non-creator cannot see delete button", function () {
      // Log in with a different user
      cy.request("POST", "http://localhost:3003/api/users/", {
        name: "Non-Creator User",
        username: "noncreator",
        password: "password",
      });
      cy.login({ username: "noncreator", password: "password" });

      // Visit the blog page and assert delete button is not visible
      cy.visit("http://localhost:3000");
      cy.contains("Test Blog").click();
      cy.get("@blogItem").should("not.contain", "delete");
    });

    it("Creator can see and delete the blog", function () {
      // Log in as the creator
      cy.get("@creator").then((response) => {
        const { username, password } = response.body;
        cy.login({ username, password });

        // Visit the blog page and assert delete button is visible
        cy.visit("http://localhost:3000");
        cy.contains("Test Blog").click();
        cy.get("@blogItem").should("contain", "delete");

        // Delete the blog
        cy.get("@blogItem").find("button").contains("delete").click();

        // Assert that the blog is deleted and not visible
        cy.get("html").should("not.contain", "Test Blog");
      });
      describe("Blog app", function () {
        beforeEach(function () {
          // Reset the database and create multiple blogs with different numbers of likes
          cy.request("POST", "http://localhost:3003/api/testing/reset");
          const user = {
            name: "Test User",
            username: "testuser",
            password: "password",
          };
          cy.request("POST", "http://localhost:3003/api/users/", user);
          cy.login({ username: "testuser", password: "password" });
          cy.createBlog({
            title: "Blog with 5 likes",
            author: "Author 1",
            url: "url1.com",
          });
          cy.createBlog({
            title: "Blog with 3 likes",
            author: "Author 2",
            url: "url2.com",
          });
          cy.createBlog({
            title: "Blog with 7 likes",
            author: "Author 3",
            url: "url3.com",
          });
        });

        it("Blogs are ordered by likes", function () {
          // Visit the page displaying the blogs
          cy.visit("http://localhost:3000");

          // Extract the titles and likes into an array
          cy.get(".blog").then((blogs) => {
            const blogList = blogs
              .map((index, blog) => {
                const title = Cypress.$(blog).find(".title").text();
                const likes = parseInt(Cypress.$(blog).find(".likes").text());
                return { title, likes };
              })
              .get();

            // Sort the array in descending order based on likes
            const sortedBlogs = blogList.sort((a, b) => b.likes - a.likes);

            // Assert that the blogs match the order of the sorted array
            sortedBlogs.each((index, blog) => {
              cy.get(".blog").eq(index).should("contain", blog.title);
            });
          });
        });

        it("Likes update changes the order", function () {
          // Visit the page displaying the blogs
          cy.visit("http://localhost:3000");

          // Click the like button on a blog and wait for the likes to update
          cy.contains("Blog with 3 likes")
            .parent()
            .find("button")
            .contains("like")
            .click();
          cy.wait(500); // Adjust the wait time as needed

          // Extract the titles and likes into an array
          cy.get(".blog").then((blogs) => {
            const blogList = blogs
              .map((index, blog) => {
                const title = Cypress.$(blog).find(".title").text();
                const likes = parseInt(Cypress.$(blog).find(".likes").text());
                return { title, likes };
              })
              .get();

            // Sort the array in descending order based on likes
            const sortedBlogs = blogList.sort((a, b) => b.likes - a.likes);

            // Assert that the blogs match the order of the sorted array
            sortedBlogs.each((index, blog) => {
              cy.get(".blog").eq(index).should("contain", blog.title);
            });
          });
        });
      });
    });
  });
});
