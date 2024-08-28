defmodule WhistleApi.Schemas.Game do
  use Ecto.Schema
  import Ecto.Changeset

  schema "game" do
    field :score_team_1, :integer
    field :score_team_2, :integer

    belongs_to :team_1, WhistleApi.Schemas.Team
    belongs_to :team_2, WhistleApi.Schemas.Team
    belongs_to :tournament, WhistleApi.Schemas.Tournament
    timestamps()
  end

  def changeset(game, params \\ %{}) do
    game
    |> cast(params, [:score_team_1, :score_team_2])
    |> validate_required([:score_team_1, :score_team_2])
  end
end
