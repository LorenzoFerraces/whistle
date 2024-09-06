defmodule WhistleApi.Teams do
  @moduledoc """
  The Teams context.
  """

  import Ecto.Query, warn: false
  alias WhistleApi.Repo

  alias WhistleApi.Tournaments.Team

  @doc """
  Creates a team.

  ## Examples

      iex> create_team(%{field: value})
      {:ok, %Team{}}

      iex> create_team(%{field: bad_value})
      {:error, ...}

  """
  def create_team(attrs \\ %{}) do
    %Team{}
    |> Team.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a team.

  ## Examples

      iex> update_team(team, %{field: new_value})
      {:ok, %Team{}}

      iex> update_team(team, %{field: bad_value})
      {:error, ...}

  """
  def update_team(%Team{} = team, attrs) do
    team
    |> Team.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Team.

  ## Examples

      iex> delete_team(team)
      {:ok, %Team{}}

      iex> delete_team(team)
      {:error, ...}

  """
  def delete_team(%Team{} = team) do
    Repo.delete(team)
  end

  @doc """
  Returns a data structure for tracking team changes.

  ## Examples

      iex> change_team(team)
      %Todo{...}

  """
  def change_team(%Team{} = team, attrs \\ %{}) do
    team
    |> Team.changeset(attrs)
  end
end
