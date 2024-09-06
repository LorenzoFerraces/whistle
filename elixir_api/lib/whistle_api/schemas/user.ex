defmodule WhistleApi.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :username, :string
    field :email, :string
    field :location, :string
    field :phone, :string
    field :preferredSport, Ecto.Enum, values: [:football, :volleyball, :handball]
    field :image, :binary
    has_many :tournaments, WhistleApi.Schemas.Tournament

    timestamps()
  end

  def changeset(user, params \\ %{}) do
    user
    |> cast(params, [:username, :email, :location, :phone, :preferredSport, :image])
    |> validate_required([:username, :email, :location, :phone, :preferredSport, :image])
  end
end
