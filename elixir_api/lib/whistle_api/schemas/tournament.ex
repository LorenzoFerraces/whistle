defmodule WhistleApi.Schemas.Tournament do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tournament" do
    field :name, :string
    field :description, :string
    field :sport, Ecto.Enum, values: [:football, :volleyball, :handball]
    field :date, :date
    field :location, :string
    field :image, :binary
    field :status, :boolean
    field :privacy, :boolean

    belongs_to :user, WhistleApi.Schemas.User
    has_many :team, WhistleApi.Schemas.Team
    has_many :game, WhistleApi.Schemas.Game
    timestamps()
  end

  def changeset(tournament, params \\ %{}) do
    tournament
    |> cast(params, [:name, :description, :sport, :date, :location, :image])
    |> validate_required([:name, :description, :sport, :date, :location, :image])
  end
end
