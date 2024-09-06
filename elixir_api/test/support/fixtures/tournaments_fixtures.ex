defmodule WhistleApi.TournamentsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `WhistleApi.Tournaments` context.
  """

  @doc """
  Generate a tournament.
  """
  def tournament_fixture(attrs \\ %{}) do
    {:ok, tournament} =
      attrs
      |> Enum.into(%{

      })
      |> WhistleApi.Tournaments.create_tournament()

    tournament
  end

  @doc """
  Generate a team.
  """
  def team_fixture(attrs \\ %{}) do
    {:ok, team} =
      attrs
      |> Enum.into(%{

      })
      |> WhistleApi.Tournaments.create_team()

    team
  end

  @doc """
  Generate a game.
  """
  def game_fixture(attrs \\ %{}) do
    {:ok, game} =
      attrs
      |> Enum.into(%{

      })
      |> WhistleApi.Tournaments.create_game()

    game
  end
end
