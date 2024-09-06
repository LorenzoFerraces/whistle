defmodule WhistleApi.Tournaments.Team do
  use Ecto.Schema
  import Ecto.Changeset

  schema "team" do
    field :name, :string
    field :wins, :integer
    field :losses, :integer
    field :draws, :integer
    field :gf, :integer
    field :ga, :integer

    belongs_to :tournament, WhistleApi.Schemas.Tournament
    has_many :game, WhistleApi.Schemas.Game
    timestamps()
  end

  def changeset(team, params \\ %{}) do
    team
    |> cast(params, [:name, :wins, :losses, :draws, :gf, :ga])
    |> validate_required([:name])
  end
end
