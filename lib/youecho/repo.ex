defmodule Youecho.Repo do
  use Ecto.Repo,
    otp_app: :youecho,
    adapter: Ecto.Adapters.Postgres
end
