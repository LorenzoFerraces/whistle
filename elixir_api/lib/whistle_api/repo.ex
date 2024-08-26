defmodule WhistleApi.Repo do
  use Ecto.Repo,
    otp_app: :whistle_api,
    adapter: Ecto.Adapters.Postgres
end
