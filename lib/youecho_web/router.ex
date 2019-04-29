defmodule YouechoWeb.Router do
  use YouechoWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug BasicAuth, use_config: {:youecho, :basic_auth}
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", YouechoWeb do
    pipe_through :browser

    get "/", PageController, :index

    resources "/cards", CardController
    resources "/dialogs", QuestionController
  end

  # Other scopes may use custom stacks.
  scope "/api", YouechoWeb do
    pipe_through :api

    resources "/cards", API.CardController
  end
end
