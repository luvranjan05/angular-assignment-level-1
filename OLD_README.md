# Angular Assignment

In this assignment, you have to create a angular application which provides following functionalities:

- List users in a table
- Search for a user
- Sort columns of table
- Pagination of users list
- Detail page for each user on a separate route

_**Attention to detail and meeting all requirements is important in the project. Completing it in less time will not give you any preference.**_

## **Task Overview**

App functions:

- **Table:** The main screen should list all users in the table
  - columns to show: `first_name`, `last_name`, `age`, `web` and `email`
  - clicking on first name should open `Details` page on a separate route
  - website links (`web`) should open in a new browser tab
- **Search**: Allow to **search** using first_name or last_name
- **Pagination**: Data should be paginated
- **Sort**: All columns should be sortable in both ascending and descending order
- **Detail**: Detail page should show all fields of user
  - Clicking on **back** navigates back to Users table page
- **Routing**: Table and Detail pages should be on their respective routes:
  - Route for Table page should be `/users`
  - Route for Detail page should `/users/<id>` (e.g: _/users/2_, if id of user is 2)

## API endpoint

_[List Users API](https://d2k-static-assets.s3.ap-south-1.amazonaws.com/assignment-files/python-backend-assignment/users.json)_

The user model has following fields:

```tsx
User -
  id -
  first_name -
  last_name -
  age -
  email -
  web -
  company_name -
  city -
  state -
  zip;
```

## **Instructions**

- **Angular 18 or later** (Must use best practices and latest primitives)
- **Material UI**, **PrimeNG**, or any other design kit you're comfortable with
- **IMPORTANT**: Pagination, search and sorting should be implemented manually in the frontend only. **DO NOT** use 3rd party library or inbuilt feature for these.
- Data should be _fetched_ from the [api provided](#api-endpoint) (and not stored in source code)
- Repo should not contain irrelevant folders/files like node_modules, build directories etc.
- Follow the [wireframes](#wireframes) provided closely
- Follow these steps for submission:
  1. Create a github public repository
  1. Create issues and work on them in their respective branches
  1. Complete the tasks while following all instructions
  1. Create MRs and merge into main branch
  1. When done, Test if all task requirements are met and instructions followed
  1. Push code to github
  1. Deploy and host the app using Github Pages or any other suitable hosting provider.
  1. Reply to the same email with the **repo URL** and **hosted URL**
- For any queries please email back the HR.

## Wireframes

> **NOTE:** These wireframes are provided for inspiration. You can design your own layouts, but the pages and routes must match the structure described above.

Wireframes for users table page _(left)_ and user detail page _(right)_
![Wireframes for screens](screens-wireframes.png)
