defmodule WhistleApi.AccountsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `WhistleApi.Accounts` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{

      })
      |> WhistleApi.Accounts.create_user()

    user
  end
end
