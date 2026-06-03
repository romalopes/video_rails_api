# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...

# VIDEO RAILS PROJECT

## SETUP

Creating the project video

```bash
 rails new video --api
```

As it is --api, it doesn't have view. Just have views/layouts because of emails.

- Uncomment Gemfile cors.
- Add faker for fake information.

```gemfile
gem "rack-cors"
gem "faker" # only in development
```

To install the project

```bash
bundle
```

### It creates the ./config/initiazers/cors.rb.

- Uncomment the block

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # where your requests come from eg. your react app IP address or URL
    origins "example.com"
    # origins "*"
    origins "http://localhost:5173"


    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

Generating the rails scaffold:

- It creates a bunch of files.

```bash
rails g scaffold post title body:text
```

In db/seeds.rb, add some posts:

```bash
rails db:migrate

rails db:seed

rails c
Post.all

bundle add rails-controller-testing
```

Testing controller:

```ruby
  test "should display posts in descending order of creation" do
    get posts_url, as: :json
    assert_response :success
    assert_equal Post.order(created_at: :desc).pluck(:id), JSON.parse(response.body).map { |post| post["id"] }
    assert_equal Post.order(created_at: :desc), assigns(:posts)
  end
```

Run test and the api server.

```bash
rails test

rails s

```

In Browser

```browser
http://127.0.0.1:3000/posts
```

Change the routers.rb to /api/v1

```ruby
namespace :api do
    namespace :v1 do
      resources :posts
    end
  end
```

Also, create 'api/v1' put the controller there and change it:

```rb
class Api::V1::PostsController < ApplicationController
```

Now:

```browser
http://127.0.0.1:3000/api/v1/posts

http://127.0.0.1:3000/api/v1/posts/1
```
